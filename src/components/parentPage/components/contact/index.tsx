"use client"
import {IoIosCall, IoIosMail} from "react-icons/io";
import {FaInstagram, FaLinkedin, FaMapMarkerAlt, FaTwitter} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import React from "react";

export default function ContactAndSocial({student}: {student: any}) {
    return (
        <>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-6 overflow-auto">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact</h4>
                <div className="space-y-3 mb-6 border-b pb-4">
                    {[
                        { icon: IoIosMail, label: 'Email', value: student.contact.email },
                        { icon: IoIosCall, label: 'Phone', value: student.contact.phone },
                        { icon: FaMapMarkerAlt, label: 'Address', value: student.contact.address },
                    ].map((item, index) => (
                        <div key={index} className="flex items-start text-sm text-gray-600">
                            <item.icon className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                            <div>
                                <p className="font-medium">{item.label}:</p>
                                <p className="text-gray-700">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h4>
                <div className="space-y-3">
                    {[
                        { icon: FaLinkedin, label: 'Linkedin', value: 'linkedin.com/ava', color: 'text-blue-600' },
                        { icon: FaTwitter, label: 'Twitter', value: '@avamitchell', color: 'text-sky-400' },
                        { icon: FaInstagram, label: 'Instagram', value: '@ava.mitchell', color: 'text-pink-500' },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                                <item.icon className={`w-5 h-5 mr-3 ${item.color}`} />
                                <span className="font-medium text-gray-700">{item.label}</span>
                            </div>
                            <button className="text-gray-400 hover:text-indigo-600 transition">
                                <MdEdit className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}