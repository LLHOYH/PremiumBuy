// components/ClaimSuccess.tsx
'use client'

import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Trophy, ExternalLink } from "lucide-react"

interface ClaimSuccessProps {
  amount: string;
  txHash?: string;
  onClose?: () => void;
}

const ClaimSuccess = ({ amount, txHash, onClose }: ClaimSuccessProps) => {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: "Prize Claimed Successfully! 🎉",
      description: `${amount} USDC has been sent to your wallet.`,
      action: txHash ? (
        <ToastAction altText="View transaction" onClick={() => window.open(`https://celoscan.io/tx/${txHash}`, '_blank')}>
          View TX
        </ToastAction>
      ) : undefined,
      className: "bg-green-50 border-green-200",
    })
  }, [])

  return (
    <Card className="bg-white/90 backdrop-blur-sm animate-in slide-in-from-bottom-4">
      <CardContent className="pt-6 pb-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-green-600">Claim Successful!</h3>
          
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-600">
            <Trophy className="w-6 h-6" />
            {amount} USDC
          </div>
          
          {txHash && (
            <a 
              href={`https://celoscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:text-purple-700 flex items-center justify-center gap-1"
            >
              View Transaction <ExternalLink className="w-4 h-4" />
            </a>
          )}
          
          {onClose && (
            <Button 
              onClick={onClose}
              variant="outline" 
              className="mt-4"
              title='Close'
            >
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimSuccess;