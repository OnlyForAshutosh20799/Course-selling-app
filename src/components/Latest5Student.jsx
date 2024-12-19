import React from 'react';


function Latest5Student({ student }) {



    return (
        <>
            <div className=" ">
                <table className="min-w-full table-auto bg-gray-200">
                    <thead>
                        <tr className="bg-[#461bac] text-white ">
                            <th className="text-start px-4 py-2">S.N</th>
                            <th className="text-start px-4 py-2">Name</th>
                            <th className="text-start px-4 py-2">Email</th>
                            <th className="text-start px-4 py-2"> Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student && student.length > 0 ? (
                            student.map((s, index) => (
                                <tr key={index} className="hover:bg-[#7033FF] hover:text-white cursor-pointer">

                                    <td className=" px-4 py-2">{index + 1}</td>
                                    <td className=" px-4 py-2">{s.fullName}</td>
                                    <td className=" px-4 py-2">{s.email}</td>
                                    <td className=" flex justify-start items-center gap-2 px-4 py-2">  {s.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center  px-4 py-2">
                                    No students available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>


            </div>

        </>
    );
}

export default Latest5Student;
