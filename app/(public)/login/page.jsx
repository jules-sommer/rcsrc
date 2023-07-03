import UseProtectedRoute from "../_providers/useProtectedRoute";

const AccountView = () => {

    return (
        <UseProtectedRoute>
            <h1>Account</h1>
        </UseProtectedRoute>
    )

}

export default AccountView;