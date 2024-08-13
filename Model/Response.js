
import { connection as db } from "../Config/index.js";

class Response {
    // Fetch all responses
    fetchAllResponses(req, res) {
        const qry = `
            SELECT resID, Injury, crimeType, DetailedCrime, whereCrime, whenCrime, amountSus, ClothesofSus, Location, Weapon, VehicleInvolved
            FROM Response;
        `;
        db.query(qry, (err, results) => {
            if (err) {
                console.error('Error fetching responses:', err);
                return res.status(500).json({
                    status: 'error',
                    msg: 'Failed to fetch responses'
                });
            }
            res.status(200).json({
                status: 'success',
                results
            });
        });
    }

    // Fetch a single response by ID
    fetchResponseById(req, res) {
        const qry = `
            SELECT resID, Injury, crimeType, DetailedCrime, whereCrime, whenCrime, amountSus, ClothesofSus, Location, Weapon, VehicleInvolved
            FROM Response
            WHERE resID = ?;
        `;
        db.query(qry, [req.params.id], (err, result) => {
            if (err) {
                console.error('Error fetching response:', err);
                return res.status(500).json({
                    status: 'error',
                    msg: 'Failed to fetch response'
                });
            }
            if (result.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    msg: 'Response not found'
                });
            }
            res.status(200).json({
                status: 'success',
                result: result[0]
            });
        });
    }

    // Add a new response
    addResponse(req, res) {
        const qry = `
            INSERT INTO Response
            SET ?;
        `;
        db.query(qry, [req.body], (err) => {
            if (err) {
                console.error('Error adding response:', err);
                return res.status(500).json({
                    status: 'error',
                    msg: 'Failed to add response'
                });
            }
            res.status(201).json({
                status: 'success',
                msg: 'New response added'
            });
        });
    }

    // Delete a response
    deleteResponse(req, res) {
        const qry = `
            DELETE FROM Response
            WHERE resID = ?;
        `;
        db.query(qry, [req.params.id], (err) => {
            if (err) {
                console.error('Error deleting response:', err);
                return res.status(500).json({
                    status: 'error',
                    msg: 'Failed to delete response'
                });
            }
            res.status(200).json({
                status: 'success',
                msg: 'Response deleted'
            });
        });
    }

    // Update a response
    updateResponse(req, res) {
        const qry = `
            UPDATE Response
            SET ?
            WHERE resID = ?;
        `;
        db.query(qry, [req.body, req.params.id], (err) => {
            if (err) {
                console.error('Error updating response:', err);
                return res.status(500).json({
                    status: 'error',
                    msg: 'Failed to update response'
                });
            }
            res.status(200).json({
                status: 'success',
                msg: 'Response updated'
            });
        });
    }
}

export {
    Response
};
