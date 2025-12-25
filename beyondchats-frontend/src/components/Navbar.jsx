import beyondChat from "../assets/beyond.png"

const Navbar = () => {
  return (
    <nav className="bg-[#011533] text-white flex items-center gap-3 p-3 pl-20 sticky top-0 z-10 border-2 border-black">
      <img src={beyondChat} alt="" width={55} />
      <h1 className="text-4xl font-bold">BeyondChats</h1>
    </nav>
  )
}

export default Navbar
