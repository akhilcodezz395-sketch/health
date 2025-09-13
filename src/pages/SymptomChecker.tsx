import React, { useState } from "react";

const GEMINI_API_KEY = "AIzaSyAvh0VuYH5m54DTzbzStHz2dA2plkMZdas";
const ENDPOINT = "https://gemini.googleapis.com/v1/models/gemini-large:predict";

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDiagnosis("");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instances: [
            {
              inputs: [
                {
                  content: `Patient reports the following symptoms: ${symptoms}. What are the possible health conditions?`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content =
        data.predictions?.[0]?.outputs?.[0]?.content ||
        "No diagnosis found";

      setDiagnosis(content);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Symptom Checker</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter symptoms separated by commas"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Checking..." : "Get Diagnosis"}
        </button>
      </form>

      {diagnosis && (
        <div className="mt-4 p-2 border rounded bg-green-50">
          <strong>Possible Health Conditions:</strong>
          <p>{diagnosis}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 border rounded bg-red-50 text-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
