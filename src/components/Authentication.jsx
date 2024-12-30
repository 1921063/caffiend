import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication (props) {
    const {handleCloseModal} = props
    const [isRegistered, setIsRegistered] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    const {signup, login} = useAuth()

    async function handleAuthenticate() {
        if (!email || !email.includes('@') || !password || password.length < 6 ||
        isAuthenticating) {
            return}
            try {
                setIsAuthenticating(true)
                setError(null)
                if(isRegistered) {
                    //register a user
                   await signup(email, password)
                } else {
                    //login a user
                    await login(email, password)
                }
                handleCloseModal()
            } catch (err) {
                console.log(err.message)
                setError(err.message)
            } finally {
                setIsAuthenticating(false)
            }
                 
    }

    return(
        <>

            <h2 className="sign-up-text">{isRegistered ? 'Sign Up' : 'Login'}</h2>
            <p>{isRegistered ? 'Create an account!' : 'Sign in to your account!'}</p>
            {error && (
                <p>❌({error})</p>
            )}
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" />
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="********" type="password" />
            <button onClick={handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div  className="register-content">
                <p>{isRegistered ? 'Already have an account!' : 'Don\'t have an account?'}</p>
                <button onClick={() => {setIsRegistered(!isRegistered)}}><p>{isRegistered ? 'Sign in' : 'Sign up'}</p></button>
            </div>
            
        </>
    )
}