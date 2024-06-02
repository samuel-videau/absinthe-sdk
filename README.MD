# Absinthe SDK

Welcome to the Absinthe SDK! This SDK provides an interface to interact with the Absinthe API, making it easier to manage and distribute points within your applications.

## Installation

Install the SDK via npm:

```bash
npm install sam-absinthe-sdk
```

## Usage

### Initialization

First, import and initialize the SDK with your API key and campaign ID:

```typescript
import AbsintheSdk from 'sam-absinthe-sdk';

const apiKey = 'your-api-key';
const campaignId = 123;

const absinthe = new AbsintheSdk(apiKey, campaignId);
```

### Methods

#### Distribute Points

To distribute points to an address:

```typescript
const pointsData = {
  points: 100,
  address: '0xef0FA6458b661128E54B36cd44f257F727a5D7e3',
  metadata: { reason: 'reward' },
};

absinthe.distribute('eventName', pointsData)
  .then(response => console.log('Points distributed:', response))
  .catch(error => console.error('Error distributing points:', error));
```

#### Get Points

To get points associated with an address:

```typescript
const address = '0xef0FA6458b661128E54B36cd44f257F727a5D7e3';

absinthe.getPoints(address)
  .then(points => console.log('Points:', points))
  .catch(error => console.error('Error getting points:', error));
```

## API Reference

### Class: `AbsintheSdk`

#### Constructor

```typescript
new AbsintheSdk(apiKey: string, campaignId: number)
```

- `apiKey`: Your Absinthe API key.
- `campaignId`: The ID of your campaign.

#### Methods

##### `distribute(eventName: string, pointsData: { points: number; address: string; metadata?: object }): Promise<Points>`

Distribute points to a specific address.

- `eventName`: The name of the event.
- `pointsData`: An object containing points, address, and optional metadata.

##### `getPoints(address: string, eventName?: string): Promise<Points[]>`

Retrieve points associated with a specific address.

- `address`: The address to query.
- `eventName`: Optional event name to filter points.

## Contributing

Contributions are welcome! Please check the [issues](https://github.com/samuel-videau/absinthe-sdk/issues) to see what needs help and feel free to open a new issue or pull request.

---

If you encounter any issues or have any questions, feel free to open an issue on [GitHub](https://github.com/samuel-videau/absinthe-sdk/issues).

---

Happy coding!