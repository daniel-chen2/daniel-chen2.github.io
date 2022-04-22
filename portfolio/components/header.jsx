import { useRouter } from 'next/router'
import Link from 'next/link'

const navLinks = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "About",
        href: "/about"
    }
]

export default function Header() {
    const router = useRouter();

    return (
        navLinks.map(function (link) {
            return (
                <Link href={link.href}>
                    <a>{link.title}</a>
                </Link>
            )
        })
    )
}

