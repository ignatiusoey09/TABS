import React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

interface IProps {
    excelData: any,
    fileName: string,
    callback: () => void
}

const ExportExcel = ({ excelData, fileName, callback }: IProps) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
        callback()
    };

    return (
        <>
            <button onClick={exportToExcel}>Export Acounts</button>
        </>
    );
};

export default ExportExcel;
