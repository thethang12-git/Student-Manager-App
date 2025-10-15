import Link from "next/link";

function register() {
    return (
        <>
            <div className="flex flex-col justify-center sm:h-screen p-4">
                <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <h1>Form đăng ký</h1>
                    </div>
                    <form>
                        <div className="space-y-6">
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                                <input name="email" type="text"
                                       className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                       placeholder="Nhập email "/>
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">Mật khẩu  </label>
                                <input name="password" type="password"
                                       className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                       placeholder="Nhập mật khẩu "/>
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block"> Nhập lại mật khẩu </label>
                                <input name="cpassword" type="password"
                                       className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                       placeholder="Xác nhận mật khẩu"/>
                            </div>

                        </div>

                        <div className="mt-12">
                            <button type="button"
                                    style={{borderRadius: "8px"}}
                                    className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                                Tạo tài khoản
                            </button>
                        </div>
                        <p className="text-slate-600 text-sm mt-6 text-center"> Đã có tài khoản?
                            <Link
                            href="/login" className="text-blue-600 font-medium hover:underline ml-1">Đăng nhập lại ở đây
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default register;