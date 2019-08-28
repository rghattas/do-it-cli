#!/usr/bin/env node
import React, { useEffect, useState } from 'react';
import { Text, render, AppContext, Box, Static, Color } from 'ink';
import SelectInput from 'ink-select-input';
import InkBox from 'ink-box';
import fs from 'fs';
import childProcess from 'child_process';

function App() {
  const [packageJson, setPackageJson] = useState();

  useEffect(() => {
    const file = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`));
    setPackageJson(file);
  }, []);

  const handleSelect = (value, exit) => {
    childProcess.execSync(`npm run ${value}`, {
      stdio: 'inherit'
    });
    exit();
  };

  if (!packageJson) {
    return null;
  }

  const items = Object.keys(packageJson.scripts).map(commandName => ({
    label: commandName,
    value: commandName
  }));

  return (
    <Box flexDirection="column">
      <Static>
        <InkBox borderStyle="double" borderColor="#9370DB" padding={1}>
          <Text>
            <span>Select a </span>
            <Color bold yellow>
              command:
            </Color>
          </Text>
        </InkBox>
      </Static>
      <Box paddingTop={1} paddingBottom={1} paddingLeft={2}>
        <AppContext.Consumer>
          {({ exit }) => (
            <SelectInput items={items} onSelect={({ value }) => handleSelect(value, exit)} />
          )}
        </AppContext.Consumer>
      </Box>
    </Box>
  );
}

render(<App />);
