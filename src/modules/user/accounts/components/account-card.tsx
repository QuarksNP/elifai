import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/modules/core/components/ui/card"

export const AccountCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <span>Current Balance</span>
                <h3></h3>
            </CardContent>
            <CardFooter>
                <span>Recent Activity</span>
            </CardFooter>
        </Card>
    )
}