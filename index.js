// index.js

const express = require('express');
const mysql = require("mysql2")
const cors = require('cors');
var bodyParser = require('body-parser');


const app = express();
app.use(express.json()) 
const port = 3000; // Choose any port you prefer
app.use(cors());
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Maslo12345',
    port: "3307",
    database: 'shop', // your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

const camelcaseTables = {
  orderitem: "order_item",
  shoporder: "shop_order"
}

const possibleTypes = {
  'VARCHAR(255)': 'VARCHAR(255)',
  TEXT: 'TEXT',
  'DECIMAL(10, 2)': 'DECIMAL(10, 2)'
};

app.get('/', (req, res) => {
  res.send('Hello, this is your Express.js app!');
});

app.delete('/api/table/:table/:id', (req, res) => {
    const table = camelcaseTables[req.params.table] ?? req.params.table
    const id = req.params.id;
    console.log("DELETE");
    pool.query(`DELETE FROM ?? WHERE ?? = ?`, [table, table + "_id", id], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: true });
        }
    
        res.status(200).json({ message: 'User deleted successfully' });
      });
});

app.post('/api/column/:table', (req, res) => {
  const { columnName, dataType, defaultValue } = req.body;
  const table = camelcaseTables[req.params.table] ?? req.params.table
  defaultValue 
  ?
  pool.query(`ALTER TABLE ?? ADD COLUMN ?? ${possibleTypes[dataType]} NOT NULL DEFAULT ?`, [table, columnName.toLowerCase(), defaultValue], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: true });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    })
  :  pool.query(`ALTER TABLE ?? ADD COLUMN ? ${possibleTypes[dataType]}`, [table, columnName.toLowerCase(), dataType], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: true });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  })
});

app.put('/api/column/:table', (req, res) => {
  const { oldColumnName, newColumnName } = req.body;
  const table = camelcaseTables[req.params.table] ?? req.params.table
  console.log(table);
  pool.query(`ALTER TABLE ?? RENAME COLUMN ?? TO ??`, [table, oldColumnName, newColumnName], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: true });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  })
});

app.delete('/api/column/:table', (req, res) => {
  const { columnName } = req.body;
  const table = camelcaseTables[req.params.table] ?? req.params.table
  console.log(table);
  pool.query(`ALTER TABLE ?? DROP COLUMN ??`, [table, columnName], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: true });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  })
});

app.get('/api/table/:table', (req, res) => {
  const table = camelcaseTables[req.params.table] ?? req.params.table
    pool.query(`SELECT * FROM ${mysql.escapeId(table)}`, (error, results) => {
        if (error) {
            console.log(error);
          return res.status(500).json({ error: true });
        }
        
        res.status(200).json({ message: results });
      });
})

// creation


app.post('/api/table/:table', (req, res) => {
  const snakeCase = convertKeysToSnakeCase(req.body);
  const table = req.params.table;
  const columns = Object.keys(snakeCase);
  const values = columns.map(column => mysql.escape(snakeCase[column]));

  const placeholders = columns.map(() => '?').join(', ');
  console.log("PLACEHOLDERS", placeholders);
  console.log("VALUES", values);
  const query = `
    INSERT INTO ${table} (${columns.join(', ')})
    VALUES (${values})
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
      console.log(query)
      return res.status(500).json({ error: true });
    }

    res.status(201).json({ message: 'Review created successfully' });
  });
})

app.put('/api/row/:table', (req, res) => {
  const snakeCaseMessage = convertKeysToSnakeCase(req.body.data);
  const snakeCaseCondition = convertKeysToSnakeCase(req.body.conditionData);
  const table = req.params.table;
  const columns = Object.keys(snakeCaseCondition);
  const conditonColumns = Object.keys(snakeCaseCondition);
  const updateData = Object.keys(snakeCaseMessage).map(column => `${mysql.escapeId(column)} = ${mysql.escape(snakeCaseMessage[column])}`).join(', ')
  const whereClause = conditonColumns.map(column => `${mysql.escapeId(column)} = ${mysql.escape(snakeCaseCondition[column])}`).join(' AND ');
  const placeholders = columns.map(() => '?').join(', ');
  const query = `UPDATE ${mysql.escapeId(table)}
    SET ${updateData}
    WHERE ${whereClause}`
  ;

  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
      console.log(query)
      return res.status(500).json({ error: true });
    }

    res.status(201).json({ message: `${table} edited successfully` });
  });
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// LOGOWANIE 
// Obsługa logowania
app.post('/api/login', (req, res) => {
  const {email, password} = req.body;
  const sqlQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
  pool.query(sqlQuery, [email, password], (error, results) => {
    if (error) {
      res.status(500).json({error: true});
      return;
    }
    if (results.length > 0) {
      const isAdmin = results[0].is_admin;
      console.log(isAdmin)
      res.status(200).send({error: false, isAdmin});
    } else {
      res.status(401).send({error: true});
    }
  });
});


// DELETNG SPECIFIC


app.delete('/api/orderitem', (req, res) => {
  const { orderId, productId } = req.body;
  pool.query(`DELETE FROM order_item WHERE order_id = ?? AND product_id = ??`, [orderId, productId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: true });
      }
  
      res.status(200).json({ message: 'Order item deleted successfully' });
    });
});

app.delete('/api/shoporder', (req, res) => {
  const { orderId, userId } = req.body;
  pool.query(`DELETE FROM shop_order WHERE order_id = ?? AND user_id = ??`, [orderId, userId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: true });
      }
  
      res.status(200).json({ message: 'Shop order deleted successfully' });
    });
});

app.get('/api/column/:table', (req, res) => {
  const table = camelcaseTables[req.params.table] ?? req.params.table
    pool.query(`SHOW COLUMNS FROM ${mysql.escapeId(table)}`, (error, results) => {
        if (error) {
            console.log(error);
          return res.status(500).json({ error: true });
        }
        
        res.status(200).json({ message: results });
      });
})

app.patch('/api/column/:columnName', (req, res) => {
  const columnName = req.params.columnName;
  const { table, afterColumn } = req.body;
  const mappedTable = camelcaseTables[table] ?? table;
  pool.query(`SHOW COLUMNS FROM ${mysql.escapeId(mappedTable)}`, (error, results) => {
    if (error) {
        console.log(error);
    }
    const columnFieldToModify = results.find(column => column.Field === columnName);
    if (afterColumn.toLowerCase() !== "first") {
      pool.query(`ALTER TABLE ${mysql.escapeId(table)} MODIFY ${columnName} ${columnFieldToModify.Type} AFTER ${afterColumn}`, (error, results) => {
        if (error) {
            console.log(error);
          return res.status(500).json({ error: true });
        }
        
        res.status(200).json({ message: results });
      });
    } else {
      pool.query(`ALTER TABLE ${mysql.escapeId(table)} MODIFY ${columnName} ${columnFieldToModify.Type} FIRST`, (error, results) => {
        if (error) {
            console.log(error);
          return res.status(500).json({ error: true });
        }
        
        res.status(200).json({ message: results });
      });
    }
  });

})

function convertKeysToSnakeCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnakeCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      acc[snakeKey] = convertKeysToSnakeCase(value);
    } else {
      acc[snakeKey] = value;
    }

    return acc;
  }, {});
}