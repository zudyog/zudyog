import express, { Router } from 'express';
import SectorController from './sector.controller';

class SectorRoute {
  private sectorController: SectorController = new SectorController();

  /**
   * @swagger
   * tags:
   *   name: sectors
   *   description: Sectors management APIs
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Sector:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         id:
   *           type: string
   *           description: Auto-generated unique identifier
   *         name:
   *           type: string
   *           description: Sector's full name
   */
  public routes: Router = express.Router();

  constructor() {
    /**
     * @swagger
     * /sectors:
     *   post:
     *     summary: Create a new sector
     *     tags: [sectors]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Sector's full name
     *             required:
     *               - name
     *     responses:
     *       201:
     *         description: Sector created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Sector'
     *       400:
     *         description: Invalid input
     */
    this.routes.post("/", this.sectorController.add);

    /**
     * @swagger
     * /sectors:
     *   get:
     *     summary: Retrieve all sectors
     *     tags: [sectors]
     *     responses:
     *       200:
     *         description: List of sectors
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Sector'
     */
    this.routes.get('/', this.sectorController.getAll);

    /**
     * @swagger
     * /sectors/{id}:
     *   get:
     *     summary: Get sector by ID
     *     tags: [sectors]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Unique identifier of the sector
     *     responses:
     *       200:
     *         description: Sector details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Sector'
     *       404:
     *         description: Sector not found
     */
    this.routes.get('/:id', this.sectorController.getById);

    /**
     * @swagger
     * /sectors/{id}:
     *   put:
     *     summary: Update sector information
     *     tags: [sectors]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Unique identifier of the sector
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Sector'
     *     responses:
     *       200:
     *         description: Sector updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Sector'
     *       404:
     *         description: Sector not found
     */
    this.routes.put('/:id', this.sectorController.update);

    /**
     * @swagger
     * /sectors/{id}:
     *   delete:
     *     summary: Delete a sector
     *     tags: [sectors]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Unique identifier of the sector
     *     responses:
     *       200:
     *         description: Sector deleted successfully
     *       404:
     *         description: Sector not found
     */
    this.routes.delete('/:id', this.sectorController.delete);
  }
}

export default new SectorRoute().routes;