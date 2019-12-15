class DatabaseQueries {
  static getDataFromTable(table) {
    return `SELECT * FROM ${table}`;
  }

  static insertIntoTableValues(table, params) {
    const columnNames = Object.keys(params).join(", ");
    const columnValues = Object.values(params).join(", ");

    return `INSERT INTO ${table} (${columnNames}) VALUES (${columnValues});`;
  }

  static updateTableValues(table, id, params) {
    const formatToDatabeSyntax = Object.keys(params)
      .map(columnName => `${columnName} = ${params[columnName]}`)
      .join(", ");

    return `UPDATE ${table} SET ${formatToDatabeSyntax} WHERE id = ${id};`;
  }

  static deleteValueFromTable(table, id) {
    return `DELETE FROM ${table} WHERE id = ${id};`;
  }
}

module.exports = DatabaseQueries;
