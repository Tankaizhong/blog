import * as XLSX from 'xlsx'

export const exportToExcel = (columns, data, fileName: string) => {
  // 创建工作簿和工作表
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet([columns.map((column) => column.title)])

  // 将数据添加到工作表
  data.forEach((item) => {
    const rowData = columns.map((column) => item[column.dataIndex])
    XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: -1 }) // 将数据添加到工作表的末尾
  })

  // 添加工作表到工作簿
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // 设置列宽
  ws['!cols'] = columns.map((column) => ({ wch: column.title.length + 2 }))

  // 保存文件
  XLSX.writeFile(wb, fileName)
}
