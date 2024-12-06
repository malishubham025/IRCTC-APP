import React from "react";

function AdminPage() {
    return (
        <div className="admin-page">
            <h1>Welcome Admin</h1>
            <form method="post">
                <h3>Add Train</h3>
                <input type="text" placeholder="Source" name="source" />
                <input type="text" placeholder="Destination" name="destination" />
                <input type="text" placeholder="Train ID" />
                <button type="submit">Add</button>
            </form>

            <form method="post">
                <h3>Remove Train</h3>
                <input type="text" placeholder="Enter Train ID" />
                <button type="submit">Submit</button>
            </form>

            <button>View Trains</button>
        </div>
    );
}

export default AdminPage;
