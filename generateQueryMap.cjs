const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const CSV_FOLDER = path.join(__dirname, "public/data");
const OUTPUT_QUERYMAP = path.join(__dirname, "public/queryMap.json");
const OUTPUT_TABLES = path.join(__dirname, "public/tables.json");

const generateQueryMap = async () => {
  const queryMap = {};
  const tablesInfo = [];

  try {
    const files = fs.readdirSync(CSV_FOLDER);

    for (const file of files) {
      if (file.endsWith(".csv")) {
        const tableName = path.basename(file, ".csv");
        const filePath = path.join(CSV_FOLDER, file);

        const csvData = fs.readFileSync(filePath, "utf-8");
        const parsedData = Papa.parse(csvData, { header: true });

        if (!parsedData.meta.fields) {
          console.warn(`⚠️ Skipping ${file} (No columns found)`);
          continue;
        }

        const columns = parsedData.meta.fields.map((col) => col.toLowerCase());

        // Store table info
        tablesInfo.push({ name: tableName, columns });

        // Basic Query (Select All)
        queryMap[`select * from ${tableName}`] = { 
          table: tableName, 
          filter: "", 
          columns: columns 
        };

        // Generate individual column selection queries
        columns.forEach((col) => {
          queryMap[`select ${col} from ${tableName}`] = { 
            table: tableName, 
            filter: "", 
            columns: [col] 
          };
        });
      }
    }

    // Save output files
    fs.writeFileSync(OUTPUT_QUERYMAP, JSON.stringify(queryMap, null, 2));
    fs.writeFileSync(OUTPUT_TABLES, JSON.stringify(tablesInfo, null, 2));

    console.log(`✅ Query map generated successfully at ${OUTPUT_QUERYMAP}`);
    console.log(`✅ Tables info saved at ${OUTPUT_TABLES}`);
  } catch (error) {
    console.error("❌ Error generating query map:", error);
  }
};

// Run script
generateQueryMap();
