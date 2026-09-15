function SessionConfig({
  workMinutes,
  breakMinutes,
  cycles,
  onChange,
  disabled
}) {
  const inputClass = `
    w-14
    bg-[#FFFDF8]
    text-[#3D3833]
    text-center
    rounded-lg
    px-2 py-1.5
    border border-[#DED3C7]
    focus:outline-none
    focus:border-[#D49A84]
    focus:ring-2
    focus:ring-[#D49A84]/20
    disabled:opacity-50
  `

  return (
    <div
      className="
        bg-[#FFFDF8]
        border border-[#E8DED2]
        rounded-2xl
        px-4 py-4
        shadow-sm
      "
    >
      <div className="
        flex flex-wrap
        items-center
        justify-center
        gap-3
      ">

        {/* Work */}
        <div className="
          flex items-center gap-2
          bg-[#F3DDD4]
          rounded-xl
          px-4 py-2.5
        ">
          <span className="text-[#9E5947] text-sm font-semibold">
            Focus
          </span>

          <input
            type="number"
            min="1"
            max="120"
            value={workMinutes}
            disabled={disabled}
            onChange={(e) =>
              onChange('workMinutes', Number(e.target.value))
            }
            className={inputClass}
          />

          <span className="text-[#81776D] text-sm">
            min
          </span>
        </div>

        {/* Break */}
        <div className="
          flex items-center gap-2
          bg-[#E2EBDD]
          rounded-xl
          px-4 py-2.5
        ">
          <span className="text-[#587052] text-sm font-semibold">
            Break
          </span>

          <input
            type="number"
            min="1"
            max="60"
            value={breakMinutes}
            disabled={disabled}
            onChange={(e) =>
              onChange('breakMinutes', Number(e.target.value))
            }
            className={inputClass}
          />

          <span className="text-[#81776D] text-sm">
            min
          </span>
        </div>

        {/* Cycles */}
        <div className="
          flex items-center gap-2
          bg-[#EEE6F2]
          rounded-xl
          px-4 py-2.5
        ">
          <span className="text-[#735B83] text-sm font-semibold">
            Cycles
          </span>

          <input
            type="number"
            min="1"
            max="10"
            value={cycles}
            disabled={disabled}
            onChange={(e) =>
              onChange('cycles', Number(e.target.value))
            }
            className={inputClass}
          />

          <span className="text-[#81776D] text-sm">
            rounds
          </span>
        </div>

      </div>
    </div>
  )
}

export default SessionConfig