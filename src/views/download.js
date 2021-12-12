export const toCsv = function (table) {
    const rows = table.querySelectorAll('tr');

    return [].slice
        .call(rows)
        .map(function (row) {
            const cells = row.querySelectorAll('input');
            return [].slice
                .call(cells)
                .map(function (cell) {
                    return cell.className + ' - ' + cell.value;
                })
                .join(', ');
        })
        .join('\n');
};

export const download = function (text, fileName) {
    const link = document.createElement('a');
    link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`);
    link.setAttribute('download', fileName);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
};