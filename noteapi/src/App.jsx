import { useEffect, useState } from "react";
import { axiosInstance } from "./config/axiosInstance";
import { useForm } from "react-hook-form";

const App = () => {
  const [note, setNote] = useState([]);
  // console.log(note);
  const [editId, setEditId] = useState(null);
  console.log(editId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const apiCalling = async () => {
    try {
      const res = await axiosInstance.get("/notes/get");
      // console.log(res.data.data);
      setNote(res.data.data);
    } catch (error) {
      console.log("error in the note Api", error);
    }
  };

  const createNote = async (data) => {
    try {
      const res = await axiosInstance.post("/notes/create", data);
      // console.log(res.data.data);
    } catch (error) {
      console.log("error in the notes create api", error);
    }
  };

  useEffect(() => {
    apiCalling();
  }, []);

   const updateNoteApi =async (id, note)=>{
    try {
      const res = await axiosInstance.put(`/notes/${id}`, note)
      console.log('update data==>',res.data.data)
      await apiCalling()
      
    } catch (error) {
      console.log('error in the update api', error)
      
    }
  }

  async function onSubmit(data) {
    if(editId){
      await updateNoteApi(editId, data)
    }else{
      await createNote(data)
    }
  }

  async function deleteFnc(id) {
    try {
      const res = await axiosInstance.delete(`notes/${id}`);
      const data = res.data.data;
      console.log(data);
      await apiCalling();
    } catch (error) {
      console.log("error in the delete api", error);
    }
  }

  async function updateFnc(note) {
    // try {
    //   const res = await axiosInstance.put(`/notes/${id}`)
    //   console.log(res.data.data)
    //   console.log(id)
    // } catch (error) {
    //   console.log("error in the updateApi", error);
    // }
    setEditId(note._id)
    reset({
      title: note.title,
      description : note.description
    })
  }

 

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-slate-800">My Notes</h1>

        {/* Add Note UI */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm ">
          <h2 className="mb-5 text-xl font-semibold">Create Note</h2>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <input
              {...register("title")}
              type="text"
              placeholder="Enter title"
              className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />

            <textarea
              {...register("description")}
              rows="3"
              placeholder="Enter description"
              className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />

            <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
              Add Note
            </button>
          </form>
        </div>

        {/* Note Card UI */}
        {note.map((note) => {
          return (
            <div
              key={note._id}
              className="rounded-xl border bg-white p-6 shadow-sm mb-10"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {note.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {note.description}
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Note
                </span>
              </div>

              <div className="flex gap-3 border-t pt-4">
                <button 
                onClick={()=>updateFnc(note)}
                 className="rounded-lg bg-amber-100 px-5 py-2 text-sm font-medium text-amber-700 hover:bg-amber-200">
                  Edit
                </button>

                <button
                  onClick={() => deleteFnc(note._id)}
                  className="rounded-lg bg-red-100 px-5 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
