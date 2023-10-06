export enum ErrorType {
  PrismaClientKnownRequestError = "PrismaClientKnownRequestError",
  TransactionExistsError = "TransactionExists",
  NoTransactionError = "NoTransaction",
  InvalidHutError = "InvalidHut",
  ErrorProcessingWin = "ErrorProcessingWinResults",
  UnknownError = "unknown",
  IncorrectRecieverError = "IncorrectReciever",
  IncorrectSenderError = "IncorrectSender",
  InvalidBetError = "InvalidBet",
  InvalidMultiplierError = "InvalidMultiplier",
  InsufficientHouseFundsError = "InsufficientHouseFunds",
  HouseWalletEmptyError = "HouseWalletEmpty",
  FailedToSendError = "FailedToSend",
  FailedToConfirmError = "FailedToConfirm",
  // Add more error types as needed
}

export const handleError = (errorType: ErrorType) => {
  switch (errorType) {
    case ErrorType.PrismaClientKnownRequestError:
      //admin must check if transaction was added to database
      return { name: errorType, error: "Invalid database query" };
    case ErrorType.TransactionExistsError:
      //tx already exists
      return { name: errorType, error: "Transaction already processed" };
    case ErrorType.NoTransactionError:
      //no transaction sent to backend
      return { name: errorType, error: "No transaction was sent" };
    case ErrorType.InvalidHutError:
      //invalid hut name sent to backend
      return { name: errorType, error: "An invalid hut was sent" };
    case ErrorType.ErrorProcessingWin:
      //admin should check database, win could not be processed
      return {
        name: errorType,
        error: "Please contact an admin with your txid",
      };
    case ErrorType.IncorrectRecieverError:
      //incorrect reciever of bet
      return { name: errorType, error: "Incorrect reciever address" };
    case ErrorType.IncorrectSenderError:
      //bet sender cannot be house wallet
      return { name: errorType, error: "Incorrect sender address" };
    case ErrorType.InvalidBetError:
      //bet was not a valid amount
      return { name: errorType, error: "Invalid bet was sent" };
    case ErrorType.InvalidMultiplierError:
      //multiplier was nota  valid amount
      return { name: errorType, error: "Invalid multiplier" };
    case ErrorType.HouseWalletEmptyError:
      //multiplier was nota  valid amount
      return { name: errorType, error: "House wallet is empty" };
    case ErrorType.InsufficientHouseFundsError:
      //multiplier was nota  valid amount
      return {
        name: errorType,
        error: "Insufficient house funds to allow this wager",
      };
    case ErrorType.FailedToConfirmError:
      //admin should check database, win could not be processed
      return {
        name: errorType,
        error: "Failed to confirm transaction",
      };
    case ErrorType.FailedToSendError:
      //admin should check database, win could not be processed
      return {
        name: errorType,
        error: "Failed to send transaction",
      };

    // Handle more error types here
    default:
      return { name: errorType, error: "Unknown" };
  }
};
