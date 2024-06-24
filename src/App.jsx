import { useState, useCallback, useEffect, useRef, StrictMode } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(
    function () {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (number) str += "0123456789";
      if (symbol) str += "!@#$%^&*{}()";
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }
      setPassword(pass);
    },
    [length, number, symbol, setPassword]
  );

  const copyPassword = useCallback(function(){
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,4)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(
    () => passwordGenerator(),
    [length, number, symbol, passwordGenerator]
  );

  const passwordRef = useRef(null)

  return (
    <>
      <StrictMode>
      <div className="w-full px-10 py-5 bg-gray-800 rounded-xl shadow-lg flex flex-col gap-5 text-orange-700">
        <div className="text-center text-4xl">Password Generator</div>
        <div className="flex justify-center">
          <br />
          <input
            type="text"
            value={password}
            placeholder="password"
            name="password"
            className=" rounded bg-white w-full outline-none"
            ref={passwordRef}
            readOnly
          />
          <button className="relative right-2 outline-none rounded bg-blue-800" onClick={()=>copyPassword()}>
            Copy
          </button>
        </div>
        <div className="flex justify-center gap-5">
          <input
            type="range"
            name="slider"
            min={6}
            max={100}
            value={length}
            className=" cursor-pointer "
            onChange={function (e) {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="slider">Length: {length}</label>

          <input
            type="checkbox"
            defaultChecked={number}
            name="number"
            onChange={() => setNumber((prev) => !prev)}
          />
          <label htmlFor="number">Number </label>

          <input
            type="checkbox"
            defaultChecked={symbol}
            name="symbol"
            onChange={() => setSymbol((prev) => !prev)}
          />
          <label htmlFor="symbol">Symbol</label>
        </div>
      </div>
      </StrictMode>
    </>
  );
}

export default App;
