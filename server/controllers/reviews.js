import {pool} from "../db.js";
export const createReview = (req, res) => {
    // Get user data from the request body
    const data = req.body;

    // Create a new user in the database
    const query =
        "INSERT INTO reviews (ID, Firstname, Lastname, Rating, CreatedAt) VALUES (?, ?, ?, ?, ?)";
    const values = [null, data.firstName, data.lastName, data.rating, new Date()];

    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error getting database connection:", err);
            return res.status(500).json({
                status: "error",
                message: "connection Internal Server Error",
            });
        }

        connection.query(query, values, (error, result) => {
            console.log(query);
            connection.release();

            if (error) {
                console.error("Error creating user:", error);
                return res.status(500).json({
                    status: "error",
                    message: "test Internal Server Error",
                });
            }

            // Return the newly created user
            res.status(201).json({
                status: "success",
                data: { id: result.insertId, Firstname: data.Firstname , Lastname: data.lastName, Rating: data.rating },
            });
        });
    });
};

export const getAllReviews = (req, res) => {
    // Get user data from the request body
    const { firstName, lastName, rating } = req.body;

    // Create a new user in the database
    const query = "SELECT * FROM reviews";

    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error getting database connection:", err);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }

        connection.query(query, (error, result) => {
            connection.release();

            if (error) {
                console.error("Error retrieving data:", error);
                return res.status(500).json({
                    status: "error",
                    message: "Internal Server Error",
                });
            }

            // Return the newly created user
            res.status(201).json({
                status: "success",
                data: result,
            });
        });
    });
};

export const getReview = (req, res) => {
    const query = "SELECT * FROM reviews WHERE ID = " + `"${req.params.id}"`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error getting database connection:", err);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }

        connection.query(query, (error, result) => {
            connection.release();

            if (error) {
                console.error("Error retrieving data:", error);
                return res.status(500).json({
                    status: "error",
                    message: "Internal Server Error",
                });
            }

            // Return the newly created user
            res.status(201).json({
                status: "success",
                data: result,
            });
        });
    });
};


export const updateReview = (req, res) => {

}
export const deleteReview = (req, res) => {}