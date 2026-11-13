const noteModel = require('../note.model')

const noteCreateController = async (req, res) => {
  const { title, description } = req.body;

  const notes = await noteModel.create({
    title,
    description,
  });

  return res.status(201).json({
    success: true,
    message: "note created successfully",
    data: notes,
  });
};

// get 
const getNoteController =async (req,res)=>{
try {
    const getNotes = await noteModel.find()

    res.status(200).json({
        success:true,
        message: "fetched all notes",
        data : getNotes
    })
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'internal server issue'
    })
}

}

// find one and read
const readNoteConntroller = async (req,res)=>{
    try {
        const  id = req.params.id

    const readNote = await noteModel.findById(id)
    res.status(200).json({
        success:true,
        message: "fetched successfully",
        data:readNote
    })
    } catch (error) {
     console.log(error)   
    }

}

// find one and update

const updateNoteController = async (req,res)=>{
   try {
     const noteId = req.params.id
    const body = req.body
    const updateNotes = await noteModel.findByIdAndUpdate(noteId, body, {new: true})
    res.status(200).json({
        success: true,
        message: "update successfully",
        data: updateNotes
    })
   } catch (error) {
     res.status(500).json({
        success: false,
        message: 'internal server issue'
    })
    
   }
}

// find one and delete 
const deleteNoteController = async (req,res)=>{
       try {
     const noteId = req.params.id
  
    const updateNotes = await noteModel.findByIdAndDelete(noteId)
    res.status(200).json({
        success: true,
        message: "delete Successfully",
        data: updateNotes
    })
   } catch (error) {
     res.status(500).json({
        success: false,
        message: 'internal server issue'
    })
    
}
}

module.exports = {noteCreateController,getNoteController,updateNoteController,readNoteConntroller,deleteNoteController}