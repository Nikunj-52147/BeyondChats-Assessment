import beyondChat from "../assets/beyond.png"

const Footer = () => {

    const currentYear = new Date().getFullYear()

  return (
    <footer>
      <nav className="bg-[#011533] text-white flex justify-center items-center gap-3 p-3 pl-20 sticky top-0 z-10 border-2 border-black">
            <img src={beyondChat} alt="" width={35} />
            <p className="texl-xl text-neutral-400  font-bold">© {currentYear} BeyondChats. All rights reserved.</p>
          </nav>
    </footer>
  )
}

export default Footer
