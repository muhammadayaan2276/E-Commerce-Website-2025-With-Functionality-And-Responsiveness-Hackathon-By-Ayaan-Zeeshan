"use client"

import { useState, useCallback } from "react"
import { Search } from "lucide-react"
import { client } from "@/sanity/lib/client"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import Link from "next/link"
import { Product } from "@/utils/types"

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("") // Search term state

  // Handle search logic
  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setSearchResults([]) // Clear results if no search term
      return
    }
    setLoading(true)
    try {
      const groqquery = `*[_type == "product" && (
        lower(title) match "*${query.toLowerCase()}*" || 
        lower(description) match "*${query.toLowerCase()}*" ||
        "${query.toLowerCase()}" in tags[] 
      )] {
        _id,
        name,
        price,
        "imageUrl": image.asset->url,
        category,
      }`
      const results = await client.fetch(groqquery)
      console.log("groqqueryresult:", results)
      setSearchResults(results)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced search function
  const debounce = <T extends (...args: string[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch])

  // Trigger debounced search on search term change
  const handleSearchTermChange = (search: string) => {
    setSearchTerm(search)
    debouncedSearch(search)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
      >
        <Search size={20} className="text-black" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b border-gray-200 px-3 bg-white">
          <CommandInput
            placeholder="Search products..."
            value={searchTerm}
            onValueChange={handleSearchTermChange} // Pass string directly to the handler
            className="flex h-11 w-full rounded-md bg-white py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 border-0"
          />
        </div>
        <CommandList className="bg-white">
          {loading ? (
            <div className="py-6 text-center text-sm text-black bg-white">
              Loading...
            </div>
          ) : (
            <>
              <CommandGroup heading="Searched Products" className="text-black bg-white">
                {searchResults.map((product) => (
                  <Link href={`shop/${product._id}`} key={product._id}>
                    <CommandItem
                      onSelect={() => setOpen(false)}
                      className="flex items-center gap-2 p-2 cursor-pointer bg-white hover:bg-[#fbebb5]"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-12 h-12 rounded bg-[#fbebb5] flex items-center justify-center">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-black">{product.name}</span>
                          <span className="text-sm text-gray-500">${product.price}</span>
                        </div>
                      </div>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
              <CommandEmpty className="text-gray-500 bg-white">
                No products found.
              </CommandEmpty>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
