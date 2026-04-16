"use client";

import { useActionState } from "react";
import { updateClinic } from "@/app/actions/settings";
import { Loader2, Building2, Phone, MapPin } from "lucide-react";
import { StatusMessage } from "./status-message";

const TIMEZONES = [
  { value: "Europe/Madrid", label: "España (Madrid) UTC+1/+2" },
  { value: "America/Argentina/Buenos_Aires", label: "Argentina (Buenos Aires) UTC-3" },
  { value: "America/Bogota", label: "Colombia (Bogotá) UTC-5" },
  { value: "America/Lima", label: "Perú (Lima) UTC-5" },
  { value: "America/Santiago", label: "Chile (Santiago) UTC-4/-3" },
  { value: "America/Mexico_City", label: "México (Ciudad de México) UTC-6/-5" },
  { value: "America/Caracas", label: "Venezuela (Caracas) UTC-4" },
  { value: "America/Montevideo", label: "Uruguay (Montevideo) UTC-3" },
  { value: "America/Guayaquil", label: "Ecuador (Guayaquil) UTC-5" },
  { value: "America/Asuncion", label: "Paraguay (Asunción) UTC-4/-3" },
  { value: "UTC", label: "UTC" },
];

type Props = { defaultValues: { name: string; phone: string; address: string; timezone: string } };

export function ClinicForm({ defaultValues }: Props) {
  const [state, action, pending] = useActionState(updateClinic, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Nombre de la clínica <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            name="name"
            required
            defaultValue={defaultValues.name}
            placeholder="Nombre de la clínica"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="phone"
              defaultValue={defaultValues.phone}
              placeholder="+34 91 000 00 00"
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="address"
              defaultValue={defaultValues.address}
              placeholder="Calle, Ciudad"
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Zona horaria
        </label>
        <select
          name="timezone"
          defaultValue={defaultValues.timezone}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-1">
          Afecta los horarios del bot y del calendario
        </p>
      </div>

      <StatusMessage state={state} />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          {pending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
