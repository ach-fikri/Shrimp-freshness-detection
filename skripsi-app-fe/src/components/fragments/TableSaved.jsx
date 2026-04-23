import Button from "../elements/Button/index.jsx";
import {useEffect, useState} from "react";
import {deletePredict, listPredict} from "../../services/predict.service.js";

const TableSaved = ({onAlert}) => {
    const [datas, setDatas] = useState([]);
    const [sortOrder, setSortOrder] = useState({key: 'index', order: 'asc'});
    const [sortedData, setSortedData] = useState([]);
    const [id, setId] = useState("");
    // Fetch data from the service
    useEffect(() => {
        listPredict((status, res) => {
            if (status) {
                setDatas(res.data.data);
            }
        });
    }, []);

    // Sorting logic
    const handleSort = (key) => {
        const newOrder = sortOrder.order === 'asc' ? 'desc' : 'asc';
        const sorted = [...datas].sort((a, b) => {
            if (key === 'index') {
                return newOrder === 'asc' ? datas.indexOf(a) - datas.indexOf(b) : datas.indexOf(b) - datas.indexOf(a);
            }
            return newOrder === 'asc'
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key]);
        });
        setSortOrder({key, order: newOrder});
        setSortedData(sorted);
    };

    const handleDelete = (id) => {
        deletePredict(id, (status, res) => {
            if (status) {

                const r = {
                    show: true,
                    type: "success",
                    message: "Data berhasil dihapus"
                };

                const updatedDatas = datas.filter((data) => data._id !== id);
                setDatas(updatedDatas); // Update state 'datas'
                setSortedData(updatedDatas);
                onAlert(r);
                document.getElementById('my_modal_3').close();
            } else {
                const r = {
                    show: true,
                    type: "error",
                    message: res.data?.message || "Error"
                };
                onAlert(r);
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            }
        });
    };
    const openModal = (id) => {
        document.getElementById("my_modal_3").showModal();
        setId(id);
    };

    useEffect(() => {
        setSortedData(datas);
    }, [datas]);

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                    </form>
                    <h3 className="font-bold text-lg">Anda Yakin ingin menghapus!</h3>
                    <p className="py-4">Data yang dihapus tidak dapat dikembalikan.</p>
                    <div className="modal-action flex justify-center">
                        <Button onClick={() => document.getElementById('my_modal_3').close()} className="mr-2 bg-red-500 ">Batal</Button>
                        <Button onClick={() => handleDelete(id)}>Hapus</Button>
                    </div>
                </div>
            </dialog>
            <div className="flex justify-center items-center overflow-x-auto">

                <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th>
                            No
                            <button onClick={() => handleSort('index')} className="ml-2">
                                {sortOrder.key === 'index' && sortOrder.order === 'asc' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 15l7-7 7 7"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                )}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3">Image</th>
                        <th scope="col" className="px-6 py-3">
                            Hasil
                            <button onClick={() => handleSort('predictions')} className="ml-2">
                                {sortOrder.key === 'predictions' && sortOrder.order === 'asc' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 15l7-7 7 7"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                )}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedData.map((data, index) => {
                        const no = sortOrder.order === 'asc' ? index + 1 : sortedData.length - index;
                        return (
                            <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {no}
                                </th>
                                <td className="px-6 py-4 text-center">
                                    <img
                                        className="w-20 h-20 object-cover mx-auto"
                                        src={`http://localhost:3000/static/images/${data.image}`}
                                        alt={data.image.split('.')[0]}
                                    />
                                </td>
                                <td className="px-6 py-4">{data.predictions}</td>
                                <td className="px-6 py-4">{new Date(data.createdAt).toDateString()}</td>
                                <td className="px-6 py-4">
                                    <Button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => openModal(data._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TableSaved;
