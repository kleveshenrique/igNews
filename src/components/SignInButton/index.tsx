import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"

export function SignInButton(){
    const {data: session} = useSession()   
   
    return (
        <button 
            className={styles.btnSignInGithub} 
            type="button"
            onClick={()=>session?signOut():signIn()}        
        > 
            <FaGithub color={session ? 'green':'yellow'} />
            {session ? session.user.name : 'Sign in with Github'}
            <FiX className={session? '' : styles.closeIcon} />
        </button>
    )
}