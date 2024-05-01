import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../Icons/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";

const columns = [
    { name: "Image", uid: "imageUrl" },
    { name: "Id", uid: "id" },
    { name: "Title", uid: "title" },
    { name: "Actions", uid: "actions" },
];

export default function AdminTable({ blogItems, onDelete, onEdit }) {
    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "title":
                return <p className="text-sm text-gray-900 dark:text-white">{cellValue}</p>;
            case "id":
                return <span className="text-sm text-gray-600 dark:text-gray-400">{cellValue}</span>;
            case "imageUrl":
                return (
                    <img src={cellValue} alt={`Blog ${item.id}`} className="w-20 h-20 object-cover rounded-md" />
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-start gap-5">
                        <Tooltip content="Edit Post">
                            <span onClick={() => onEdit(item)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete Post">
                            <span onClick={() => onDelete(item.id)} className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [onDelete, onEdit]);

    return (
        <Table aria-label="Blog items table">
            <TableHeader>
                {columns.map(column => (
                    <TableColumn key={column.uid} align={column.uid === "imageUrl" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody items={blogItems}>
                {item => (
                    <TableRow key={item.id}>
                        {columns.map(column => (
                            <TableCell key={column.uid}>{renderCell(item, column.uid)}</TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
