const router=require('express').Router();
const Exercise=require('../models/exercise.model');

router.route("/").get(async (req,res)=>{
    try{
        const exercises=await Exercise.find();
        res.json(exercises);
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

router.route('/add').post(async (req,res)=>{
    try{
        const username=req.body.username;
        const description=req.body.description;
        const duration=Number(req.body.duration);
        const date=Date.parse(req.body.date);

        const newExercise=new Exercise({
            username,
            description,
            duration,
            date,
        });

        await newExercise.save();
        res.json("Exercise added");
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

router.route("/:id").get(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.route("/:id").delete(async (req,res)=>{
    try{
        const exercise=await Exercise.findByIdAndDelete(req.params.id);
        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }
        res.json("Id Deleted");
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

router.route("/update/:id").post(async (req,res)=>{
    try{
        const exercise=await Exercise.findById(req.params.id);
        if(!exercise){
            return res.status(400).json({error:"Exercise not found"});
        }
        exercise.username=req.body.username;
        exercise.description=req.body.description;
        exercise.duration=Number(req.body.duration);
        exercise.date=Date(req.body.date);

        await exercise.save();
        res.json("Exercise Updated");
    }catch(err){
        res.status(400).json({error:err.message});
    }
});


module.exports=router;