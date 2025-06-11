'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Search, MoreVertical, Phone, Video, Info, Plus, Paperclip, Users, Bell, MessageCircle, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const users = [
  {
    id: 1,
    name: 'Felecia Rower',
    message: 'If it takes long you ...',
    time: '10 AM',
    avatar: '/images/user1.png',
    unreadCount: 1,
  },
  {
    id: 2,
    name: 'Adalberto Grand',
    message: 'I will purchase it fo...',
    time: '10 AM',
    avatar: '/images/user2.png',
    unreadCount: 1,
  },
  {
    id: 3,
    name: 'Joaquina Weiser',
    message: 'Soufflé soufflé car...',
    time: '10 AM',
    avatar: '/images/user3.png',
    unreadCount: 0,
  },
  {
    id: 4,
    name: 'Verla Morgano',
    message: 'Chupa chups cand...',
    time: '10 AM',
    avatar: '/images/user4.png',
    unreadCount: 2,
  },
  {
    id: 5,
    name: 'Margot Henschke',
    message: 'Cake pie jelly jelly ...',
    time: '10 AM',
    avatar: '/images/user5.png',
    unreadCount: 0,
  },
  {
    id: 6,
    name: 'Sal Piggee',
    message: 'Toffee caramels jel...',
    time: '10 AM',
    avatar: '/images/user6.png',
    unreadCount: 2,
  },
  {
    id: 7,
    name: 'Miguel Guelff',
    message: 'Biscuit powder oat...',
    time: '10 AM',
    avatar: '/images/user7.png',
    unreadCount: 0,
  },
  {
    id: 8,
    name: 'Mauro Elenbaas',
    message: 'Bear claw ice crea...',
    time: '10 AM',
    avatar: '/images/user8.png',
    unreadCount: 0,
  },
  {
    id: 9,
    name: 'Bridgett Omohundro',
    message: 'Gummies gummi be...',
    time: '10 AM',
    avatar: '/images/user9.png',
    unreadCount: 0,
  },
  {
    id: 10,
    name: 'Zenia Jacobs',
    message: '',
    time: '10 AM',
    avatar: '/images/user10.png',
    unreadCount: 1,
  },
];

type Message = {
  id: number;
  fromMe: boolean;
  text: string;
  time: string;
};

const initialChatState: Record<number, Message[]> = {
  1: [
    { id: 1, fromMe: false, text: 'Hello. How can I help You?', time: '01:15 PM' },
    { id: 2, fromMe: true, text: 'Hi', time: '01:15 PM' },
    { id: 3, fromMe: true, text: 'Can I get details of my last transaction I made last month?', time: '01:16 PM' },
    { id: 4, fromMe: false, text: 'We need to check if we can provide you such information.', time: '01:15 PM' },
    { id: 5, fromMe: false, text: 'I will inform you as I get update on this.', time: '01:16 PM' },
    { id: 6, fromMe: true, text: 'If it takes long you can mail me at my mail address.', time: '01:06 PM' },
  ],
  2: [
    { id: 1, fromMe: false, text: 'Hi, how can I help you?', time: '09:00 AM' },
    { id: 2, fromMe: true, text: 'I will purchase it for sure!', time: '09:01 AM' },
  ],
};
users.forEach(user => {
  if (!initialChatState[user.id]) initialChatState[user.id] = [];
});

export default function Chat() {
  const [activeUser, setActiveUser] = useState(users[0]);
  const [chats, setChats] = useState<Record<number, Message[]>>(initialChatState);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [showUserList, setShowUserList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeUser]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  const handleSend = () => {
    if (input.trim()) {
      const msg: Message = {
        id: (chats[activeUser.id]?.length || 0) + 1,
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fromMe: true,
      };
      setChats(prev => ({
        ...prev,
        [activeUser.id]: [...(prev[activeUser.id] || []), msg],
      }));
      setInput('');
    }
  };

  const activeMessages = chats[activeUser.id] || [];

  return (
    <div className="flex bg-[#f7f9fb] h-svh">
      <aside
        className={`
          flex-col transition-transform duration-300 ease-in-out
          ${isMobile ? (showUserList ? 'fixed inset-y-0 left-0 z-40 py-12 lg:py-4 w-full max-w-full flex' : 'fixed inset-y-0 left-0 z-40 w-full max-w-full -translate-x-full hidden') : 'xl:static xl:translate-x-0 xl:w-[320px] xl:min-w-[260px] xl:max-w-[340px] xl:z-0 flex'}
          bg-white border-r border-[#e5e7eb]
        `}
      >
        <div className="items-center hidden gap-3 p-4 mt-8 lg:flex xl:mt-0">
          <Avatar>
            <AvatarImage src="/images/user1.png" alt="Mr. Bean" />
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
          <div className="lg:flex-1">
            <div className="font-semibold text-[#222]">Mr. Bean <span className="ml-1 text-xs text-green-500">●</span></div>
            <div className="text-xs text-gray-400">UX/UI Designer</div>
          </div>
          <Button variant="ghost" size="icon"><MoreVertical className="text-gray-400 rotate-90 size-8 bg-[#e8edf3] p-1 rounded-full" /></Button>
        </div>
        <div className="items-center hidden gap-2 px-4 py-3 lg:flex">
          <div className="relative flex-1">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2 size-4" />
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-md pl-9 pr-3 py-2 text-sm text-gray-700 border border-[#e5e7eb] focus:outline-none"
            />
          </div>
        </div>
        <div className="hidden lg:flex gap-2 w-[87%] mx-auto justify-between py-4 ">
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center gap-1 text-[#377dff]"
          >
            <MessageCircle className="size-6" />
            <span className="text-xs font-semibold">Chats</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center gap-1 text-gray-400"
          >
            <Users className="size-6" />
            <span className="text-xs">Groups</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center gap-1 text-gray-400"
          >
            <Bell className="size-6" />
            <span className="text-xs">Notification</span>
          </Button>
        </div>
        <div className="flex-1 px-4 mt-4 mb-4 overflow-y-scroll">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className={`flex items-center   gap-3 mb-4 px-4 py-3 cursor-pointer hover:bg-[#f3f4f6] ${activeUser.id === user.id ? 'bg-[#f3f4f6] lg:border-l-2 border-[#377dff]' : ''}`}
              onClick={() => {
                setActiveUser(user);
                if (isMobile) {
                  setShowUserList(false);
                }
              }}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                {activeUser.id === user.id && (
                  <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-[#222] truncate">{user.name}</div>
                <div className="text-xs text-gray-400 truncate">{user.message}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-400">{user.time}</span>
                {user.unreadCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#8b5cf6] text-white text-xs">
                    {user.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main
        className={`flex-1 flex flex-col bg-[#f7f9fb] px-2 sm:px-4 md:px-8 transition-all duration-300 
          ${isMobile ? (showUserList ? 'hidden' : 'fixed inset-y-0 right-0 z-40 w-full max-w-full flex') : 'flex'}
        `}
      >
        {/* Back arrow for mobile, absolute top left */}
        {isMobile && !showUserList && (
          <button
            className="absolute z-50 p-2 top-28 md:top-42 md:left-8 left-3 xl:hidden"
            onClick={() => setShowUserList(true)}
            aria-label="Back to user list"
          >
            <ArrowLeft className="w-6 h-6 text-[#444]" />
          </button>

        
        )}
        <div className="flex items-center justify-between px-2 sm:px-4 md:px-2  md:py-4 border-b border-[#e5e7eb] bg-white mt-16 md:mt-20 xl:mt-0">
          <div className="flex items-center gap-3">
            <div className="relative flex item-center">
              <Avatar className="ring-2 ring-[#f0f] ring-offset-2">
                <AvatarImage src={activeUser.avatar} alt={activeUser.name} />
                <AvatarFallback>{activeUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <div className="font-semibold text-[#222]">{activeUser.name}</div>
                <div className="text-xs text-green-500">Active Now</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon"><Phone className="size-5 text-[#8b5cf6]" /></Button>
            <Button variant="ghost" size="icon"><Video className="size-5 text-[#8b5cf6]" /></Button>
            <Button variant="ghost" size="icon"><Info className="size-5 text-[#8b5cf6]" /></Button>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 px-2 py-4 overflow-y-auto shadow-lg sm:py-6">
          {activeMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <svg width="64" height="64" fill="none" className="mx-auto mb-4" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#F3F4F6"/><ellipse cx="32" cy="32" rx="16" ry="12" fill="#E5E7EB"/><circle cx="24" cy="30" r="2" fill="#D1D5DB"/><circle cx="32" cy="30" r="2" fill="#D1D5DB"/><circle cx="40" cy="30" r="2" fill="#D1D5DB"/></svg>
              <div className="text-lg font-semibold">No message yet...</div>
              <div className="text-sm">don&apos;t worry, just take a deep breath &amp; say &quot;Hello&quot;</div>
            </div>
          ) : (
            <>
              <div className="my-2 text-xs text-center text-gray-500">Today 14:20</div>
              {activeMessages.map(msg => (
                <div key={msg.id} className={`flex group ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
                  {!msg.fromMe && (
                    <Avatar className="mr-2">
                      <AvatarImage src={activeUser.avatar} alt={activeUser.name} />
                      <AvatarFallback>{activeUser.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {msg.fromMe && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-6 h-6 p-0 mr-1 transition-opacity opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="text-gray-500 size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="text-black bg-white shadow-lg">
                            <DropdownMenuItem>Remove</DropdownMenuItem>
                            <DropdownMenuItem>Reply</DropdownMenuItem>
                            <DropdownMenuItem>Pin</DropdownMenuItem>
                            <DropdownMenuItem>Forward</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      <div className={` px-4 py-2 rounded-2xl text-sm ${msg.fromMe ? 'bg-[#e6e6fa] text-[#6c63ff] self-end' : 'bg-[#e6f0fa] text-[#222] self-start'}`}>
                        {msg.text}
                      </div>
                      {!msg.fromMe && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-6 h-6 p-0 ml-1 transition-opacity opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="text-gray-500 size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="text-black bg-white shadow-lg">
                            <DropdownMenuItem>Remove</DropdownMenuItem>
                            <DropdownMenuItem>Reply</DropdownMenuItem>
                            <DropdownMenuItem>Pin</DropdownMenuItem>
                            <DropdownMenuItem>Forward</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <div className={`text-[11px] text-gray-400 mt-1 ${msg.fromMe ? 'self-end' : 'self-start'}`}>
                      {msg.time}
                    </div>
                  </div>
                  {msg.fromMe && (
                    <Avatar className="ml-2">
                      <AvatarImage src="/images/user1.png" alt="Mr. Bean" />
                      <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        <form
          className="flex items-center gap-2 px-0 py-4 border-t border-[#e5e7eb] bg-white"
          onSubmit={e => { e.preventDefault(); handleSend(); }}
        >
          <div className="items-center hidden gap-2 lg:flex">
            <Button variant="ghost" size="icon" type="button" className="text-[#8b5cf6]">
              <Plus className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" type="button" className=" text-[#8b5cf6]">
              <Paperclip className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" type="button" className=" text-[#8b5cf6]">
              <span role="img" aria-label="sticker" className="text-xl">🌟</span>
            </Button>
          </div>
          <input
            type="text"
            placeholder="Tap a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="relative flex-1 px-4 py-2 text-base text-gray-700 border-4 border-gray-100 rounded-2xl placeholder:text-gray-400"
          />
          <div className="absolute flex items-center gap-2 right-4 md:right-12 xl:right-32">
            <Button variant="ghost" size="icon" type="button" className=" text-[#8b5cf6]">
              <span role="img" aria-label="emoji" className="text-xl">😊</span>
            </Button>
            <Button type="submit" variant="ghost" size="icon" className="bg-[#f3f4f6] text-[#8b5cf6]">
              <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
