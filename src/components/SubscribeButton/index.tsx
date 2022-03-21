import { signIn, useSession } from 'next-auth/react';
import {api} from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface subscribButtonProps {
    priceId:string;
}


export function SubscribeButton({priceId}:subscribButtonProps){
    
    const {data: session} = useSession()

    async function handleSubscribe(){    
        if(!session){
            signIn('github')                        
            return;
        }
        
        try {
            
            const response = await api.post('/subscribe')
    
            const { sessionId } = response.data
            const stripe = await getStripeJS()
    
            await stripe.redirectToCheckout({sessionId})       

        } catch (error) {
          alert(error)
        }


    }
    
    return (
        <button 
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            subscribe now
        </button>
    )
}