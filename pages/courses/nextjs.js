import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Courses = () => {
    const router = useRouter();

    return (
        <div>
            <Link href="/courses/nextjs">Welcome to Next.js with Ankita</Link>
            <Link href="/">Page {router.query.id}</Link>
        </div>
    );
}

export default Courses;
