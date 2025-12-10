"use client"
import React, {useEffect, useMemo, useState} from "react";
import {ArrowUpDown, Edit, Trash2} from "lucide-react";


const StudentList = ({ initialStudentsData } :any ) => {
    const [students, setStudents] = useState<any[]>([]);
    useEffect(() => {
        setStudents(initialStudentsData);
    }, [initialStudentsData]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    if(!initialStudentsData) return null;
    const sortedStudents = useMemo(() => {
        const sortableItems = Array.isArray(students) ? [...students] : [];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [students, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const headers = [
        { key: 'id', label: 'STT' },
        { key: 'name', label: 'Học sinh' },
        { key: 'date', label: 'Ngày bắt đầu học' },
        { key: 'class', label: 'Lớp' },
        {key:'count',label:'số buổi'},
        { key: 'actions', label: 'Hành động', sortable: false },
    ];

    const SortableHeader = ({ header }) => {
        const isCurrent = sortConfig.key === header.key;
        // Hiển thị icon sắp xếp
        const directionIcon = isCurrent ? (
            sortConfig.direction === 'ascending' ? (
                <ArrowUpDown className="w-3 h-3 ml-1 transition-all rotate-180" /> // Lên (A-Z)
            ) : (
                <ArrowUpDown className="w-3 h-3 ml-1 transition-all" /> // Xuống (Z-A)
            )
        ) : (
            <ArrowUpDown className="w-3 h-3 ml-1 opacity-20 group-hover:opacity-100 transition-opacity" /> // Mặc định
        );
        return (
            <th
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.sortable !== false ? 'cursor-pointer hover:text-indigo-600 group' : ''}`}
                onClick={() => header.sortable !== false && requestSort(header.key)}
            >
                <div className="flex items-center">
                    {header.label}
                    {header.sortable !== false && directionIcon}
                </div>
            </th>
        );
    };

    const handleAction = (action, studentId) => {
        // Logic xử lý hành động (ví dụ: Xóa, Sửa)
        console.log(`${action} học sinh ID: ${studentId}`);
        // Xóa học sinh khỏi state
        if (action === 'delete') {
            const newStudents = students.filter(s => s.id !== studentId);
            setStudents(newStudents);
        }
    };
    if (!initialStudentsData) return <div> loading ...</div>;
    return (
        <div className="h-auto shadow-md rounded-xl bg-white ">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                <tr>
                    {headers.map((header) => (
                        <SortableHeader key={header.key} header={header} />
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {sortedStudents.map((student : any) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                                <img
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                    src={student.avatar}
                                    alt={student.name}
                                    onError={(e) => {
                                        // Fallback nếu ảnh lỗi
                                        e.target.onerror = null;
                                        e.target.src = `https://placehold.co/40x40/6366f1/ffffff?text=${student.name.charAt(0)}`;
                                    }}
                                />
                                {student.name}
                            </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <span className="text-green-600 font-medium">{student.class}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 ">{student.count}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleAction('edit', student.id)}
                                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                                    title="Sửa"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleAction('delete', student.id)}
                                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                                    title="Xóa"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;