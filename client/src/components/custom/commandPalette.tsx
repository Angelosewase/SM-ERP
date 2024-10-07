// import * as React from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Combobox } from "@headlessui/react"; // Use ShadCN's Combobox if available

// function CommandPalette() {
//   const [open, setOpen] = React.useState(false);
//   const [query, setQuery] = React.useState("");
//   const items = [
//     { id: 1, name: "Dashboard" },
//     { id: 2, name: "Settings" },
//     { id: 3, name: "Profile" },
//   ];

//   // Filter items based on the search query
//   const filteredItems = query === ""
//     ? []
//     : items.filter((item) =>
//         item.name.toLowerCase().includes(query.toLowerCase())
//       );

//   // Open the palette on Ctrl + K
//   React.useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.ctrlKey && e.key === "k") {
//         e.preventDefault();
//         setOpen(true);
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   return (
//     <Dialog.Root open={open} onOpenChange={setOpen}>
//       <Dialog.Trigger asChild>
//         <button className="hidden">Open Command Palette</button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50" />
//         <Dialog.Content className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-1/3">
//           <Combobox value={query} onChange={setQuery}>
//             <Combobox.Input
//               className="w-full border border-gray-300 rounded p-2"
//               placeholder="Search..."
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <Combobox.Options>
//               {filteredItems.length === 0 && query !== "" ? (
//                 <div className="p-2 text-gray-500">No results found.</div>
//               ) : (
//                 filteredItems.map((item) => (
//                   <Combobox.Option
//                     key={item.id}
//                     value={item.name}
//                     className="p-2 cursor-pointer hover:bg-gray-200"
//                   >
//                     {item.name}
//                   </Combobox.Option>
//                 ))
//               )}
//             </Combobox.Options>
//           </Combobox>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

// export default CommandPalette;
