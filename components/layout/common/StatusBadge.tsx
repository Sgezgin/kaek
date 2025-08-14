// components/common/StatusBadge.tsx
import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_CHECK':
        return 'bg-yellow-100 text-yellow-800';
      case 'NEEDS_REVISION':
        return 'bg-orange-100 text-orange-800';
      case 'IN_REVIEW':
        return 'bg-purple-100 text-purple-800';
      case 'DECIDED':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      case 'ONAY':
        return 'bg-green-100 text-green-800';
      case 'KOSULLU_ONAY':
        return 'bg-yellow-100 text-yellow-800';
      case 'RET':
        return 'bg-red-100 text-red-800';
      case 'UYGUN':
        return 'bg-green-100 text-green-800';
      case 'UYGUN_DEGIL':
        return 'bg-red-100 text-red-800';
      case 'KOSULLU_UYGUN':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toUpperCase()) {
      case 'DRAFT':
        return 'Taslak';
      case 'SUBMITTED':
        return 'Gönderildi';
      case 'UNDER_CHECK':
        return 'Kontrol Ediliyor';
      case 'NEEDS_REVISION':
        return 'Düzeltme Gerekli';
      case 'IN_REVIEW':
        return 'İnceleniyor';
      case 'DECIDED':
        return 'Karara Bağlandı';
      case 'CLOSED':
        return 'Kapatıldı';
      case 'ONAY':
        return 'Onaylandı';
      case 'KOSULLU_ONAY':
        return 'Koşullu Onay';
      case 'RET':
        return 'Reddedildi';
      case 'UYGUN':
        return 'Uygun';
      case 'UYGUN_DEGIL':
        return 'Uygun Değil';
      case 'KOSULLU_UYGUN':
        return 'Koşullu Uygun';
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
        status
      )} ${className}`}
    >
      {getStatusText(status)}
    </span>
  );
}


