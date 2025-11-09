const paperModel = require("../paper/paperModel")
const subjectModel = require("../subject/subjectModel")



const getall = async(req,res)=>{
            var totalsubjects = await subjectModel.countDocuments()
            console.log("total subjects",totalsubjects);
            
            subjectModel.find(req.body)        
            .then((subjectdata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:subjectdata
                })
            })
            .catch((err)=>{
                res.send({
                    status:500,
                    success:false,
                    messsage:"Something went wrong!!"
                })
            })

}
const getsubjectByexam = (req, res) => {
    const examInput = req.body.exam;
    paperModel.find({ exam: examInput }, { subject: 1, image: 1, _id: 0 })
        .then((papers) => {
            // Deduplicate by subject
            const seen = new Set();
            const subjectsWithImages = papers.filter(paper => {
                if (seen.has(paper.subject)) return false;
                seen.add(paper.subject);
                return true;
            }).map(paper => ({
                subject: paper.subject,
                image: paper.image
            }));
            res.send({
                status: 200,
                success: true,
                message: "Distinct subjects with images fetched successfully for the given exam",
                data: subjectsWithImages
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: "Failed to fetch subjects with images"
            });
        });
};

module.exports ={getall,getsubjectByexam}