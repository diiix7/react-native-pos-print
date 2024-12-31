# @diiix7/react-native-pos-print

A React Native library to connect and print using Bluetooth, USB or Net thermal printers.

## Installation

Install the package using npm:

```bash
npm install @diiix7/react-native-pos-print
```

Or using yarn:

```bash
yarn add @diiix7/react-native-pos-print
```

## Example Usage for BLE print

- **Bluetooth Initialization**: Set up Bluetooth for connecting to thermal printers.
- **Device Discovery**: Search for nearby Bluetooth thermal printers.
- **Printer Connection**: Connect to a selected device using its MAC address.
- **Print Capability**: Print formatted text using the specified options.

Below is an example demonstrating how to use the library to initialize Bluetooth, search for devices, connect to a printer, and print a sample text:

```javascript
import React, { useState } from "react";
import { View, Text, Button, FlatList, Alert, StyleSheet } from "react-native";
import { BLEPrinter } from "@diiix7/react-native-pos-print";

export default function App() {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const initializePrinter = async () => {
    try {
      await BLEPrinter.init();
      Alert.alert("Bluetooth initialized", "You can now search for devices.");
    } catch (error) {
      console.error("Error initializing printer:", error);
      Alert.alert("Error", "Failed to initialize Bluetooth.");
    }
  };

  const searchDevices = async () => {
    try {
      const deviceList = await BLEPrinter.getDeviceList();
      setDevices(deviceList);
      if (deviceList.length === 0) {
        Alert.alert(
          "No devices found",
          "Please ensure your printer is discoverable."
        );
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
      Alert.alert("Error", "Failed to fetch device list.");
    }
  };

  const connectToDevice = async (macAddress) => {
    try {
      await BLEPrinter.connectPrinter(macAddress);
      setConnectedDevice(macAddress);
      Alert.alert("Connected", `Printer connected to: ${macAddress}`);
    } catch (error) {
      console.error("Error connecting to printer:", error);
      Alert.alert("Error", "Failed to connect to printer.");
    }
  };

  const printExample = async () => {
    if (!connectedDevice) {
      Alert.alert("No printer connected", "Please connect to a printer first.");
      return;
    }
    try {
      const options = {
        beep: true,
        cut: true,
        tailingLine: true,
        encoding: "UTF-8",
        codepage: 0,
      };

      await BLEPrinter.print(
        `
        <Printout>
          <Text align='center' fontWidth='1' fontHeight='1'>Hello, World!</Text>
          <NewLine />
          <Text align='right' fontWidth='1' fontHeight='1' bold='0'>This is a second line.</Text>
        </Printout>
        `,
        options
      );
      Alert.alert("Print Success", "The text has been printed successfully.");
    } catch (error) {
      console.error("Error printing:", error);
      Alert.alert("Error", "Failed to print.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thermal Printer Example</Text>
      <Button title="Initialize Bluetooth" onPress={initializePrinter} />
      <Button title="Search for Devices" onPress={searchDevices} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.innerMacAddress}
        renderItem={({ item }) => (
          <Button
            title={`Connect to ${item.deviceName}`}
            onPress={() => connectToDevice(item.innerMacAddress)}
          />
        )}
      />
      <Button
        title="Print Example Text"
        onPress={printExample}
        disabled={!connectedDevice}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
```

## Example Usage for USB print

Below is an example demonstrating how to use the library to print a sample text via USB:

```javascript
import React, { Component } from "react";
import { USBPrinter } from "@diiix7/react-native-pos-print";
import { Platform, View, Text, TouchableOpacity, Button } from "react-native";

export default class PrinterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printers: [],
      currentPrinter: null,
    };
  }

  async componentDidMount() {
    if (Platform.OS === "android") {
      await USBPrinter.init();
      const availablePrinters = await USBPrinter.getDeviceList();

      this.setState({
        printers: availablePrinters,
      });
    }
  }

  async connectPrinter(printer) {
    await USBPrinter.connectPrinter(printer.vendorId, printer.productId);

    this.setState({
      currentPrinter: printer,
    });
  }

  print() {
    USBPrinter.print(`
  <Printout>
    <Text align='center' fontWidth='1' fontHeight='1'>Example text</Text>
    <NewLine />
    <Text align='right' fontWidth='1' fontHeight='1' bold='0'>Second line</Text>
  </Printout>`);
  }

  getPrinterDescription(printer) {
    return `deviceName: ${printer.deviceName}, vendorId: ${printer.vendorId}, productId: ${printer.productId}`;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.printers.map((printer) => (
          <TouchableOpacity
            key={printer.deviceName}
            onPress={() => this.connectPrinter(printer)}
          >
            <Text>{this.getPrinterDescription(printer)}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Print" onPress={() => this.print()} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
```

## Example Usage for Net print

Below is an example demonstrating how to use the library to print a sample text via Net:

```javascript
import React, { Component } from "react";
import { NetPrinter } from "@diiix7/react-native-pos-print";
import { View, Text, TouchableOpacity, Button } from "react-native";

export default class PrinterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printers: [],
      currentPrinter: null,
    };
  }

  async componentDidMount() {
    await NetPrinter.init();
    const availablePrinters = [
      { deviceName: "test", host: "192.168.1.1", port: 9100 },
    ];

    this.setState({
      printers: availablePrinters,
    });
  }

  async connectPrinter(printer) {
    const connectedPrinter = await NetPrinter.connectPrinter(
      printer.host,
      printer.port
    );

    this.setState({
      currentPrinter: connectedPrinter,
    });
  }

  print() {
    NetPrinter.print(`
  <Printout>
    <Text align='center' fontWidth='1' fontHeight='1'>Example text</Text>
    <NewLine />
    <Text align='right' fontWidth='1' fontHeight='1' bold='0'>Second line</Text>
  </Printout>`);
  }

  getPrinterDescription(printer) {
    return `deviceName: ${printer.deviceName}, host: ${printer.host}, port: ${printer.port}`;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.printers.map((printer) => (
          <TouchableOpacity
            key={printer.deviceName}
            onPress={() => this.connectPrinter(printer)}
          >
            <Text>{this.getPrinterDescription(printer)}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Print" onPress={() => this.print()} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
