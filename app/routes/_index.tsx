import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { AlertCircle, Bike } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

export default function Home() {
  const [studentId, setStudentId] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    // Simulating an API call
    setTimeout(() => {
      if (studentId.trim().length > 0) {
        setMessage({ type: 'success', text: 'Bicycle rented successfully for 1 day. If you did not pick up the bicycle within 4 hours, the rental will be cancelled.' })
      } else {
        setMessage({ type: 'error', text: 'Invalid student ID' })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center p-4">
          <div className="flex items-center space-x-2">
            <Bike className="h-6 w-6" /> 
            <span className="font-bold">EasyJakka</span>
          </div>
        </div>
      </header>
      <main className="flex-1 container max-w-lg mx-auto p-4 flex items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Rent a Bicycle</CardTitle>
            <CardDescription>Enter your student ID to rent a bicycle for 1 day. The rental period will start when you pick up the bicycle.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRent}>
              <div className="grid w-full items-center gap-4">
                <Input
                  type="text"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Rent Bicycle'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            {message && (
              <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{message.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      </main>
      <footer className="border-t">
        <div className="container flex py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Group 297, Class C10, MUGE100. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}