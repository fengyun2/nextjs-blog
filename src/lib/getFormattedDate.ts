/**
 * 获取格式化后的日期字符串
 * @param {string} dateString - 日期字符串，格式为yyyy-MM-dd
 * @returns {string} 返回格式化后的日期字符串，格式为MM-dd-yyyy
 */
export default function getFormattedDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(
    new Date(dateString)
  );
}
