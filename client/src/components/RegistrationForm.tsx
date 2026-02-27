/*
  Registration Form — Two-path registration for the Prompt-a-thon
  Path 1: Register as a Team (captain + members)
  Path 2: Register as an Individual (placed on a team at the event)
  
  Design: On-brand Coastline glass panels, Outfit headings, Source Sans 3 body
*/

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type RegistrationType = null | "team" | "individual";

interface TeamMemberInput {
  name: string;
  email: string;
  department: string;
}

function SuccessScreen({ type, teamName }: { type: "team" | "individual"; teamName?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="text-center py-8"
    >
      <div
        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ background: "rgba(60,180,229,0.12)" }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3CB4E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3
        className="text-2xl sm:text-3xl mb-3"
        style={{ fontFamily: "var(--font-display)", color: "#003764", fontWeight: 700 }}
      >
        You're Registered!
      </h3>
      <p
        className="text-base mb-2"
        style={{ fontFamily: "var(--font-body)", color: "#4a6a82", lineHeight: 1.7 }}
      >
        {type === "team"
          ? `Team "${teamName}" has been registered for the Prompt-a-thon.`
          : "You've been registered as an individual. We'll place you on a team at the event."}
      </p>
      <p
        className="text-sm"
        style={{ fontFamily: "var(--font-body)", color: "#7a9ab2", lineHeight: 1.7 }}
      >
        April 1, 2026 &middot; 12:00 – 4:00 PM &middot; Student Services Center
      </p>
    </motion.div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-sm mb-1.5"
        style={{ fontFamily: "var(--font-body)", color: "#003764", fontWeight: 500 }}
      >
        {label} {required && <span style={{ color: "#3CB4E5" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 text-sm rounded-xl transition-all duration-300 focus:outline-none"
        style={{
          fontFamily: "var(--font-body)",
          background: "rgba(0,55,100,0.03)",
          border: "1px solid rgba(0,55,100,0.08)",
          color: "#003764",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(60,180,229,0.4)";
          e.target.style.boxShadow = "0 0 0 3px rgba(60,180,229,0.08)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(0,55,100,0.08)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function TeamForm({ onSuccess }: { onSuccess: (teamName: string) => void }) {
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainDepartment, setCaptainDepartment] = useState("");
  const [members, setMembers] = useState<TeamMemberInput[]>([]);

  const registerTeam = trpc.registration.registerTeam.useMutation({
    onSuccess: () => {
      onSuccess(teamName);
    },
    onError: (err) => {
      toast.error(err.message || "Registration failed. Please try again.");
    },
  });

  const addMember = () => {
    if (members.length < 9) {
      setMembers([...members, { name: "", email: "", department: "" }]);
    }
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof TeamMemberInput, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerTeam.mutate({
      teamName,
      captainName,
      captainEmail,
      captainDepartment: captainDepartment || undefined,
      members: members
        .filter((m) => m.name && m.email)
        .map((m) => ({
          name: m.name,
          email: m.email,
          department: m.department || undefined,
        })),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h4
          className="text-lg mb-4"
          style={{ fontFamily: "var(--font-display)", color: "#003764", fontWeight: 600 }}
        >
          Team Details
        </h4>
        <InputField label="Team Name" value={teamName} onChange={setTeamName} placeholder="e.g., The Innovators" required />
      </div>

      <div className="mb-6">
        <h4
          className="text-lg mb-4"
          style={{ fontFamily: "var(--font-display)", color: "#003764", fontWeight: 600 }}
        >
          Team Captain (You)
        </h4>
        <InputField label="Full Name" value={captainName} onChange={setCaptainName} placeholder="Your full name" required />
        <InputField label="Email" value={captainEmail} onChange={setCaptainEmail} placeholder="your.email@coastline.edu" type="email" required />
        <InputField label="Department" value={captainDepartment} onChange={setCaptainDepartment} placeholder="e.g., Student Services" />
      </div>

      {members.length > 0 && (
        <div className="mb-6">
          <h4
            className="text-lg mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#003764", fontWeight: 600 }}
          >
            Team Members
          </h4>
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-4 mb-4 rounded-xl"
              style={{ background: "rgba(0,55,100,0.02)", border: "1px solid rgba(0,55,100,0.04)" }}
            >
              <button
                type="button"
                onClick={() => removeMember(i)}
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(0,55,100,0.06)", color: "#4a6a82" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <p className="text-xs mb-3" style={{ fontFamily: "var(--font-body)", color: "#7a9ab2", fontWeight: 500 }}>
                Member {i + 1}
              </p>
              <InputField label="Full Name" value={member.name} onChange={(v) => updateMember(i, "name", v)} placeholder="Team member name" required />
              <InputField label="Email" value={member.email} onChange={(v) => updateMember(i, "email", v)} placeholder="member@coastline.edu" type="email" required />
              <InputField label="Department" value={member.department} onChange={(v) => updateMember(i, "department", v)} placeholder="e.g., IT" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {members.length < 9 && (
          <button
            type="button"
            onClick={addMember}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              background: "rgba(0,55,100,0.04)",
              border: "1px dashed rgba(0,55,100,0.12)",
              color: "#3CB4E5",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Team Member
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={registerTeam.isPending}
        className="w-full py-4 text-base rounded-xl transition-all duration-500 hover:scale-[1.01] disabled:opacity-60"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          background: "linear-gradient(135deg, #3CB4E5, #6BC4E8)",
          color: "#003764",
          letterSpacing: "0.04em",
          border: "none",
        }}
      >
        {registerTeam.isPending ? "Registering..." : "Register Team"}
      </button>
    </form>
  );
}

function IndividualForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const registerIndividual = trpc.registration.registerIndividual.useMutation({
    onSuccess: () => {
      onSuccess();
    },
    onError: (err) => {
      toast.error(err.message || "Registration failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerIndividual.mutate({
      name,
      email,
      department: department || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h4
          className="text-lg mb-4"
          style={{ fontFamily: "var(--font-display)", color: "#003764", fontWeight: 600 }}
        >
          Your Information
        </h4>
        <InputField label="Full Name" value={name} onChange={setName} placeholder="Your full name" required />
        <InputField label="Email" value={email} onChange={setEmail} placeholder="your.email@coastline.edu" type="email" required />
        <InputField label="Department" value={department} onChange={setDepartment} placeholder="e.g., Student Services" />
      </div>

      <p
        className="text-sm mb-6 p-4 rounded-xl"
        style={{
          fontFamily: "var(--font-body)",
          color: "#4a6a82",
          lineHeight: 1.7,
          background: "rgba(60,180,229,0.05)",
          border: "1px solid rgba(60,180,229,0.1)",
        }}
      >
        Don't worry about not having a team — we'll match you with other individuals at the event. It's a great way to meet new colleagues!
      </p>

      <button
        type="submit"
        disabled={registerIndividual.isPending}
        className="w-full py-4 text-base rounded-xl transition-all duration-500 hover:scale-[1.01] disabled:opacity-60"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          background: "linear-gradient(135deg, #3CB4E5, #6BC4E8)",
          color: "#003764",
          letterSpacing: "0.04em",
          border: "none",
        }}
      >
        {registerIndividual.isPending ? "Registering..." : "Register as Individual"}
      </button>
    </form>
  );
}

export default function RegistrationForm({ embedded = false }: { embedded?: boolean }) {
  const [regType, setRegType] = useState<RegistrationType>(null);
  const [success, setSuccess] = useState(false);
  const [successTeamName, setSuccessTeamName] = useState("");

  const stats = trpc.registration.stats.useQuery(undefined, {
    refetchInterval: 30000,
  });

  if (success) {
    return (
      <div className={embedded ? "" : "elevated-card p-8 sm:p-10"}>
        <SuccessScreen
          type={regType === "team" ? "team" : "individual"}
          teamName={successTeamName}
        />
      </div>
    );
  }

  return (
    <div className={embedded ? "" : ""}>
      {/* Stats bar */}
      {stats.data && stats.data.totalAttendees > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-6 px-6 py-3 rounded-full"
            style={{
              background: "rgba(60,180,229,0.06)",
              border: "1px solid rgba(60,180,229,0.1)",
            }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#4a6a82" }}>
              <strong style={{ color: "#003764", fontWeight: 600 }}>{stats.data.teamCount}</strong> {stats.data.teamCount === 1 ? "team" : "teams"} registered
            </span>
            <span className="w-px h-4" style={{ background: "rgba(0,55,100,0.1)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#4a6a82" }}>
              <strong style={{ color: "#003764", fontWeight: 600 }}>{stats.data.totalAttendees}</strong> total attendees
            </span>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {regType === null ? (
          <motion.div
            key="chooser"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Team option */}
              <button
                onClick={() => setRegType("team")}
                className="elevated-card p-8 text-left transition-all duration-500 hover:scale-[1.02] group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(0,55,100,0.06), rgba(60,180,229,0.08))" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003764" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "#003764", fontWeight: 700 }}
                >
                  Register a Team
                </h3>
                <p
                  className="text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "#5a7a92", lineHeight: 1.7 }}
                >
                  Already have a group? Register your team and add members.
                </p>
              </button>

              {/* Individual option */}
              <button
                onClick={() => setRegType("individual")}
                className="elevated-card p-8 text-left transition-all duration-500 hover:scale-[1.02] group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(0,55,100,0.06), rgba(60,180,229,0.08))" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003764" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "#003764", fontWeight: 700 }}
                >
                  Register as Individual
                </h3>
                <p
                  className="text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "#5a7a92", lineHeight: 1.7 }}
                >
                  No team yet? We'll match you with others at the event.
                </p>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={regType}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Back button */}
            <button
              onClick={() => setRegType(null)}
              className="flex items-center gap-2 mb-6 text-sm transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)", color: "#3CB4E5", fontWeight: 500 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to options
            </button>

            <div className="elevated-card p-6 sm:p-8">
              {regType === "team" ? (
                <TeamForm
                  onSuccess={(name) => {
                    setSuccessTeamName(name);
                    setSuccess(true);
                  }}
                />
              ) : (
                <IndividualForm onSuccess={() => setSuccess(true)} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
