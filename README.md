# Breach Protocol (Next.js)

A browser-based implementation of the Breach Protocol mini-game, inspired by Cyberpunk 2077. Built with Next.js and TypeScript.

## Running the App

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Run tests:**

   ```bash
   npm test
   ```

   This will run the Jest test suite with code coverage.

## Project Structure & Game Logic

The core game logic is encapsulated in the `BreachProtocol` class (`src/lib/game/BreachProtocol.ts`).

### Game Initialization & Sequence Generation

- **Config:** The game is initialized with a config object specifying matrix size, possible byte values, buffer key configurations, and available daemon names.
- **Buffer Parameters:** On creation, the game selects a buffer configuration (either provided or at random) that determines the solution length and daemon sequence structure.
- **Matrix Generation:**
  - A square matrix is filled with random bytes from the allowed set.
  - This matrix is then formatted to track which bytes have been visited during traversal.
- **Solution Sequence:**
  - The game builds the solution sequence by alternating between picking random unvisited bytes in rows and columns, marking each as visited.
  - The process continues until the solution reaches the required length or the matrix is exhausted.
- **Daemon Sequences:**
  - The solution sequence is sliced into sub-sequences based on the buffer configuration.
  - Each sub-sequence is paired with a unique daemon name for the round.

### Summary of Flow

1. **Game instance is created** with config and (optionally) buffer parameters.
2. **init()** is called:
   - Generates the random matrix.
   - Formats it for traversal.
   - Builds the solution sequence by traversing the matrix.
   - Extracts daemon sequences from the solution.
3. **Game state** is now ready for play and rendering.

---

For further details, see the source code in `src/lib/game/BreachProtocol.ts` and the included Jest test suite.
