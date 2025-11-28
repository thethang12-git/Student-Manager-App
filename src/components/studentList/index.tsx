"use client"
import React, {useMemo, useState} from "react";
import {ArrowUpDown, Edit, Trash2} from "lucide-react";

// Lưu ý: studentsData cần được truyền vào hoặc định nghĩa ở đây
// Giả định studentsData được truyền qua props hoặc định nghĩa trong file này
// Để đảm bảo tính chạy độc lập (Standalone), tôi sẽ định nghĩa lại dữ liệu mẫu TẠM THỜI ở đây.
const studentsData = [
    { id: 1001543, name: 'Anderson', gender: 'M', category: 'Hip Hop', date: 'Jan 22, 2022', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/9333ea/ffffff?text=A' },
    { id: 1001567, name: 'Beckett', gender: 'F', category: 'Hip Hop', date: 'Feb 12, 2022', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/059669/ffffff?text=B' },
    { id: 1001544, name: 'Brady', gender: 'M', category: 'Jazz', date: 'Jul 17, 2021', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/f97316/ffffff?text=B' },
    { id: 1001523, name: 'Cassidy', gender: 'F', category: 'Ballet', date: 'Sep 25, 2021', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/0ea5e9/ffffff?text=C' },
]; // Chỉ là mẫu nhỏ gọn

const StudentList = ({ initialStudentsData } :any ) => {
    // Sử dụng initialStudentsData nếu có, nếu không dùng studentsData mẫu
    const [students, setStudents] = useState(initialStudentsData || studentsData);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Logic sắp xếp (đơn giản)
    const sortedStudents = useMemo(() => {
        const sortableItems = [...students];
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
        { key: 'name', label: 'Học sinh' },
        { key: 'gender', label: 'M/F' },
        { key: 'category', label: 'Danh mục' },
        { key: 'id', label: 'ID Học sinh' },
        { key: 'date', label: 'Ngày tham gia' },
        { key: 'goal', label: 'Mục tiêu học tập' },
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
                {sortedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
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
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.gender}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.category}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <span className="text-green-600 font-medium">{student.goal}</span>
                        </td>
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