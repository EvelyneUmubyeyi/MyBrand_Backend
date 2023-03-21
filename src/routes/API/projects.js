const {createProject, getAllProjects, likeAndUnlike} = require('./../../controllers/projectController')
const {verifyAdminJWT, verifyUserJWT} = require('./../../middlewares/verifyJWT')
const express = require('express')
const projectsRouter = express.Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Project:
 *              type:
 *                  object
 *              required:
 *                  -title
 *                  -image
 *                  -link
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto generated id for a project
 *                  title:
 *                      type: string
 *                      description: project title
 *                  image:
 *                      type: string
 *                      description: cover image of the project
 *                  likes:
 *                      type: number
 *                      description: number of likes on a project
 *                  link:
 *                      type: string
 *                      description: link to the deployed project or repository
 *                  like_emails:
 *                      type: array
 *                      description: list of all the people that liked the project
 *              example:
 *                  title: Reddit clone
 *                  image: https://res.cloudinary.com/doxc03jzw/image/upload/v1677490243/fvdnihb3o2mek2lnnxhe.jpg
 *                  likes: 2
 *                  link: https://github.com/
 *                  like_emails: [e.umubyeyi@alustudent.com, ngamije@alustudent.com]
 *        
 */

/**
* @swagger
  * tags:
  *   name: Projects
  *   description: The projects operations API
*/

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Returns the list of all the projects
 *     tags: [Projects]
 *     responses:
 *        200: 
 *          description: The list of all projects
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *        500:
 *          description: server error
 *   post:
 *     security: 
 *        - bearerAuth: []
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: The project was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /projects/{id}/likes:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Like or unlike the project
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The project id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              id: 6405fefacf3041930de557d6
 *    responses:
 *      200:
 *        description: successfully liked or unliked a project
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      404:
 *        description: Project not found
 *      500:
 *        description: Some error happened
 */

projectsRouter.get('/', getAllProjects)
projectsRouter.post('/', verifyAdminJWT, createProject)
projectsRouter.patch('/:id/likes', verifyUserJWT, likeAndUnlike)

module.exports = projectsRouter