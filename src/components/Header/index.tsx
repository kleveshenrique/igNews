import React from 'react';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss'

export function Header(){
    return (
        <header className={styles.HeaderContainer}>
            <div className={styles.HeaderContent}>
                <img src='/images/logo.svg' />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>
                <SignInButton />

            </div>
        </header>
    )
}