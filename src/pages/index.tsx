import { GetStaticProps } from 'next'
import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

interface HomeProps {
  product : {
    priceId:string;
    amount:number ;   
  }
}


export default function Home( { product }: HomeProps ) {  
  return (
    <>
      <Head>        
        <title>Ignews</title>
      </Head>  
      
        <main className={styles.contentContainer}>
          <section className={styles.hero}>
            <span>👏 Hey , welcome</span>
            <h1>News About <br /> the <span>React</span> world</h1>
            <p>
              Get access to all productions <br />
              <span>for {product.amount} month</span>
            </p>
            <SubscribeButton priceId={product.priceId} />
          </section>          
          <img src="/images/avatar.svg" alt="Avatar" />
        </main>
      
    </>
  )
}

export const getStaticProps: GetStaticProps = async ()=>{  
  const price = await stripe.prices.retrieve('price_1KfmJ4ErGa4JKx3QQwKt27dt')    
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-BR",{ style: 'currency', currency: 'BRL' }).format(price.unit_amount/100),
  }
  
  return {
    props:{
      product,
    },
    revalidate:60*60*24, // 24 hours
  }
}

