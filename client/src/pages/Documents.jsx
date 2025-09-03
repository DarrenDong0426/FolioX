// Imports
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function Documents(){
    return (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            <Header/>
            <main className='flex-1 overflow-y-auto py-8'>
                <h1 className='text-4xl font-bold mb-8 text-center'>Documents</h1>
                <div className="flex border-t border-gray-500">
                    <div className="flex flex-[1]">
                        <Sidebar/>
                    </div>
                    <div className="flex flex-[4] justify-center">
                        <div>
                            Title
                        </div>
                    </div>
                </div>
             </main>
        </div>
    )
}