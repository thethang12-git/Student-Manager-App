"use client"
function NavBar ({ icon: Icon, label, isActive, onClick }: any) {
    return (
        <button
            className={`flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 ${
                isActive
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={onClick}
        >
            <Icon className="w-5 h-5 mr-3" />
            <span className="text-sm">{label}</span>
        </button>
    )
}

export default NavBar;