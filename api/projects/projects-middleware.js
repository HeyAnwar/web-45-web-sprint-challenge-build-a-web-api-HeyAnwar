// add middlewares here related to projects
async function validateProject(req, res, next) {
    try {
        const  project  = req.params.id
        if (!project) {
        res.status(400).json({
            message: 'not a valid project'
        })
    } else {
        next()
    }
    } catch (err) {
        next(err)
    }
}

// function validateProject(req, res, next) {
//     const { project } = req.body
//     if(!project || !project.trim()) {
//       res.status(400).json({
//         message: 'not a valid project'
//       })
//     } else {
//       req.project = project.trim()
//       next()
//     }
//   }

module.exports = {
    validateProject
}